import pdfIcon from "../../assets/images/icon-pdf.svg";
import imageIcon from "../../assets/images/icon-image.svg";
import xlsIcon from "../../assets/images/icon-xls.svg";
import filePlaceholderIcon from "../../assets/images/icon-file-placeholder.svg";

export interface FileType {
  name: string;
  type: string;
  url?: string;
}

export interface FileComponentProps {
  file: FileType;
  remove: () => void;
  hiddenRemove: () => void;
}

export const FileComponent = (props: FileComponentProps) => {
  const { file, remove, hiddenRemove, ...rest } = props;

  const renderFileTypeIcon = (file: FileType) => {
    switch (file.type) {
      case "application/pdf":
        return pdfIcon;

      case "image/png":
      case "image/jpg":
      case "image/jpeg":
      case "image/gif":
        return file.url || imageIcon;

      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
      case "application/vnd.ms-excel.sheet.macroEnabled.12":
      case "application/vnd.ms-excel.template.macroEnabled.12":
      case "application/vnd.ms-excel.addin.macroEnabled.12":
      case "application/vnd.ms-excel.sheet.binary.macroEnabled.12":
        return xlsIcon;

      default:
        return filePlaceholderIcon;
    }
  };
  return (
    <div className="item-file" {...rest}>
      <img src={renderFileTypeIcon(file)} alt="file" height="60" />
      <p>{file?.name}</p>
      {!hiddenRemove && <button onClick={remove}>X</button>}
    </div>
  );
};
