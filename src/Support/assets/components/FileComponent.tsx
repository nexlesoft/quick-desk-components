import React from 'react';
import pdfIcon from '../images/icon-pdf.svg';
import imageIcon from '../images/icon-image.svg';
import xlsIcon from '../images/icon-xls.svg';
import filePlaceholderIcon from '../images/icon-file-placeholder.svg';

const FileComponent = props => {
  const { file, remove, hiddenRemove, ...rest } = props;

  const renderFileTypeIcon = file => {

    switch (file.type) {
      case 'application/pdf':
        return pdfIcon;

      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg':
      case 'image/gif':
        return file.url || imageIcon;

      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.template':
      case 'application/vnd.ms-excel.sheet.macroEnabled.12':
      case 'application/vnd.ms-excel.template.macroEnabled.12':
      case 'application/vnd.ms-excel.addin.macroEnabled.12':
      case 'application/vnd.ms-excel.sheet.binary.macroEnabled.12':
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

export default FileComponent;
