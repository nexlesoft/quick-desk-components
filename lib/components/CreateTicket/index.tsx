import {
  COMMON_STATE,
  TicketPriority,
  TicketType,
} from "@nexle-soft/quick-desk-client";
import { Button } from "antd";
import { useRef, useState } from "react";

import { BackIcon } from "../../assets/icons/iconBack";
import { PlusIcon } from "../../assets/icons/iconPlus";
import { FileComponent, FileType } from "../FileComponent";
import { useTicketState } from "../SupportPage/useTicketState";

import "../../styles/index.scss";

export interface CreateTicketProps {
  onGoBack: () => void;
  onClickToDetail: (id: string | number) => void;
  merchantEmail?: string;
}

export const CreateTicket = ({
  merchantEmail,
  onGoBack,
}: CreateTicketProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFiles, setUploadFiles] = useState<Array<FileType>>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [invalidTitle, setInvalidTitle] = useState<boolean>(false);

  const [{ ticketApi, mediaApi }] = useTicketState();

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        file.url = reader.result;
        const filesClone: Array<any> = [...uploadFiles];
        filesClone.push(file);
        setUploadFiles(filesClone);
      };
      reader.readAsDataURL(file);
    } else {
      const filesClone: Array<any> = [...uploadFiles];
      filesClone.push(file);
      setUploadFiles(filesClone);
    }
  };

  const handleSend = () => {
    if (title) {
      const createTicket = (media) => {
        ticketApi
          .createTicket({
            description,
            name: `Beahub - ${title}`,
            state: COMMON_STATE.ACTIVE,
            type: TicketType.REQUEST,
            media,
            merchant_email: merchantEmail,
            priority: TicketPriority.LOW,
            setting_status_id: 1,
            setting_type_id: 44,
          })
          .then((res) => {
            if (res?.success) {
              onGoBack();
            }
          });
      };
      if (uploadFiles?.length) {
        uploadFiles?.forEach((e) => {
          if (e.url) delete e.url;
        });
        mediaApi
          .upload({ files: uploadFiles, context: "ADMINISTRATION.TICKET" })
          .then((res) => {
            if (res.every((item) => item.status === "fulfilled")) {
              const media =
                res.map((item) => item?.value?.data?.[0]?.id) || null;
              createTicket(media);
            }
          });
      } else {
        createTicket(null);
      }
    } else {
      setInvalidTitle(true);
    }
  };

  return (
    <div>
      <div className="support-header">
        <div
          className="support-header-left"
          style={{ cursor: "pointer" }}
          onClick={onGoBack}
        >
          <BackIcon size={16} />
          <h3>Create ticket</h3>
        </div>
        <div></div>
      </div>
      <div className="support-form">
        <div className="row-input">
          <p>Title</p>
          <div className="input-title">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value) setInvalidTitle(false);
              }}
            />
            {invalidTitle && (
              <div className="invalid-field">Value is require</div>
            )}
          </div>
        </div>
        <div className="row-input">
          <p>Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="row-input">
          <p>Attach files</p>
          <div className="container-file-upload">
            {!!uploadFiles?.length &&
              uploadFiles?.map((item, index) => {
                return (
                  <FileComponent
                    key={index}
                    file={item}
                    remove={() => {
                      const cloneFiles = [...uploadFiles];
                      cloneFiles.splice(index, 1);
                      setUploadFiles(cloneFiles);
                    }}
                  />
                );
              })}
            <div className="upload-button" onClick={handleClick}>
              <PlusIcon size={"1em"} />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Button
          className="me-1"
          size="small"
          type="primary"
          onClick={() => handleSend()}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
