import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { FileComponent } from "../FileComponent";
import { AttachIcon } from "../../assets/icons/iconAttach";
import { BackIcon } from "../../assets/icons/iconBack";
import { SendIcon } from "../../assets/icons/iconSend";

import "./styles/index.scss";
import {
  ActivityLogApi,
  Media,
  MediaApi,
  TicketApi,
} from "@nexle-soft/quick-desk-client";

export interface TicketDetailProps {
  onGoBack: () => void;
  ticketApi: TicketApi;
  mediaApi: MediaApi;
  activityLog: ActivityLogApi;
  userInfo: any;
}

export const TicketDetail = ({
  mediaApi,
  ticketApi,
  activityLog,
  onGoBack,
  userInfo,
}: TicketDetailProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadFiles, setUploadFiles] = useState<Array<any>>([]);
  const [uploadFilesComment, setUploadFilesComment] = useState<Array<any>>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dataTicket, setDataTicket] = useState<any>();
  const [dataLog, setDataLog] = useState<any>();
  const [comment, setComment] = useState<string>();
  const [seeDetail, setSeeDetail] = useState({ show: false, id: 0 });

  const { id } = useParams<{ id: string }>();

  const searchLogsValue = `administrations.tickets:${id}`;
  const activityLogContext = `administrations.tickets.${id}`;

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        file.url = reader.result;
        const filesClone: Array<any> = [...uploadFilesComment];
        filesClone.push(file);
        setUploadFilesComment(filesClone);
      };
      reader.readAsDataURL(file);
    } else {
      const filesClone: Array<any> = [...uploadFilesComment];
      filesClone.push(file);
      setUploadFilesComment(filesClone);
    }
  };

  const fetchActivityLog = useCallback(() => {
    activityLog
      .getList({
        limit: -1,
        order: "created_date desc",
        q: searchLogsValue,
      })
      .then((res) => {
        setDataLog(res.data);
      });
  }, [activityLog, searchLogsValue]);

  const handleSubmitComment = () => {
    const sendComment = (media: any) => {
      activityLog
        .createType({
          message: comment,
          description: "Note",
          origin_data: { files: media, merchant: { ...userInfo } },
          updated_data: { files: media, merchant: { ...userInfo } },
          activity_context: activityLogContext,
        })
        .then((res) => {
          if (res.success) {
            setComment("");
            setUploadFilesComment([]);
            fetchActivityLog();
          }
        });
    };

    if (uploadFilesComment?.length) {
      uploadFilesComment?.forEach((e) => {
        if (e.url) delete e.url;
      });
      mediaApi
        .upload({ files: uploadFilesComment, context: "ADMINISTRATION.TICKET" })
        .then((res) => {
          if (res.every((item) => item.status === "fulfilled")) {
            const media =
              res.map((item) => {
                {
                  const data = item?.value?.data as unknown as Media[];

                  return data?.[0]?.id;
                }
              }) || [];
            sendComment(media);
          }
        });
    } else {
      sendComment([]);
    }
  };

  useEffect(() => {
    if (id) {
      ticketApi.getById(id).then((res) => {
        if (res.success) {
          setTitle(res.data.name || "");
          setDescription(res.data.description || "");
          setUploadFiles(res.data.media);
          setDataTicket(res.data);
        }
      });
      fetchActivityLog();
    }
  }, [fetchActivityLog, id, ticketApi]);

  return (
    <div>
      <div className="support-header">
        <div className="support-header-left cursor-pointer" onClick={onGoBack}>
          <BackIcon size={16} />
          <h3>{`${dataTicket?.code} | ${dataTicket?.status?.name}`}</h3>
        </div>
        <div></div>
      </div>
      <div className="support-form" style={{ height: "calc(100vh - 110px)" }}>
        <div className="detail-ticket">
          <div>
            <div className="row-input">
              <p>Title</p>
              <div className="input-title">
                <input value={title} disabled type="text" />
              </div>
            </div>
            <div className="row-input">
              <p>Description</p>
              <textarea value={description} disabled />
            </div>
          </div>
          <div className="container-file-uploaded">
            {!!uploadFiles?.length && (
              <>
                <p>Attach files</p>
                <div className="list-files">
                  {uploadFiles?.map((item, index) => {
                    return (
                      <FileComponent
                        key={index}
                        file={{ ...item, type: item?.mime }}
                        remove={() => {
                          const cloneFiles = [...uploadFiles];
                          cloneFiles.splice(index, 1);
                          setUploadFiles(cloneFiles);
                        }}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="detail-comment"
          style={{
            height: uploadFilesComment?.length ? "28vh" : "37vh",
            overflow: "scroll",
          }}
        >
          {!!dataLog?.items?.length &&
            dataLog?.items?.map((item: any, index: number) => {
              return (
                <div key={index} className="row-comment">
                  <div className="container-avatar">
                    <img
                      className="avatar"
                      src={
                        item?.updated_data?.merchant?.avatar ||
                        item?.staff?.avatar ||
                        ""
                      }
                      alt={"Name"}
                    />
                  </div>
                  <div className="content-comment">
                    <div className="name">
                      <p>
                        <span className="full-name">
                          {item?.updated_data?.merchant?.firstName
                            ? `${item?.updated_data?.merchant?.firstName} ${item?.updated_data?.merchant?.lastName}`
                            : "Admin Support"}
                        </span>{" "}
                        update at {`${item?.modified_date?.slice(0, -7)}`}
                      </p>
                    </div>
                    <div className="content">
                      {item.message ? (
                        <>
                          <p>Note:</p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.message,
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <p>Updated ticket -</p>{" "}
                          <div
                            className="view-detail"
                            onClick={() =>
                              setSeeDetail((state) => ({
                                show: !state.show,
                                id: item?.id,
                              }))
                            }
                          >
                            Click to view detail
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      style={{
                        display:
                          seeDetail.show && seeDetail?.id === item?.id
                            ? "block"
                            : "none",
                      }}
                    >
                      {seeDetail.show &&
                        seeDetail?.id === item?.id &&
                        typeof item?.updated_data === "object" &&
                        Object.keys({ ...item?.updated_data })?.map(
                          (key, index) => {
                            return (
                              <div key={index} className="detail-change">
                                <span>{key}:</span>
                                <span className="from">
                                  {typeof item?.origin_data === "object" &&
                                    item?.origin_data[key]}
                                </span>
                                <span>to</span>
                                <span className="to">
                                  {item?.updated_data[key]}
                                </span>
                              </div>
                            );
                          }
                        )}
                    </div>
                    <div className="file">
                      {!!item?.updated_data?.files?.length &&
                        item?.updated_data?.files?.map(
                          (file: any, index: number) => {
                            return (
                              <FileComponent
                                key={index}
                                file={{ ...file, type: file.mime }}
                                hiddenRemove={true}
                              />
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="container-input-comment">
          <div className="container-avatar">
            <img
              className="avatar"
              src={userInfo?.profile?.avatar || ""}
              alt={[
                userInfo?.profile?.firstName || "",
                userInfo?.profile?.lastName || "",
              ].join(" ")}
            />
          </div>
          <div className="container-input">
            <div className="input">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="container-button">
                <div
                  className="upload-button upload-file-icon"
                  onClick={handleClick}
                >
                  <AttachIcon size={"1em"} />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </div>

                <button
                  disabled={!comment}
                  onClick={handleSubmitComment}
                  className="send-icon"
                >
                  <SendIcon size={"1em"} />
                </button>
              </div>
            </div>
            <div className="attach-file-comment">
              {!!uploadFilesComment?.length &&
                uploadFilesComment?.map((item, index) => {
                  return (
                    <FileComponent
                      key={index}
                      file={item}
                      remove={() => {
                        const cloneFiles = [...uploadFilesComment];
                        cloneFiles.splice(index, 1);
                        setUploadFilesComment(cloneFiles);
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
