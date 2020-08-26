import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import './file-upload.scss';

const PREVIEW_FILE = {
  doc: <i className="fa fa-file-word-o text-primary" />,
  xls: <i className="fa fa-file-excel-o text-success" />,
  ppt: <i className="fa fa-file-powerpoint-o text-danger" />,
  pdf: <i className="fa fa-file-pdf-o text-danger" />,
  zip: <i className="fa fa-file-archive-o text-muted" />,
  htm: <i className="fa fa-file-code-o text-info" />,
  txt: <i className="fa fa-file-text text-info" />,
  mov: <i className="fa fa-file-video-o text-warning" />,
  mp3: <i className="fa fa-file-audio-o text-warning" />,
  unknown: <i className="fa fa-file" />,
};

const MIME_TYPE = {
  PDF: 'application/pdf',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  DOC: 'application/msword',
  DOCX:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  AUDIO: 'audio/*',
  IMAGE: 'image/*',
  TEXT: 'text/*',
  ZIP: 'application/zip',
  VIDEO: 'video/*',
};

const PreviewImage = ({ name = 'test', image, onRemove, type }) => {
  const els = useMemo(() => {
    let previewEls;
    switch (type) {
      case MIME_TYPE.PDF:
        previewEls = PREVIEW_FILE.pdf;
        break;
      case MIME_TYPE.XLS:
      case MIME_TYPE.XLSX:
        previewEls = PREVIEW_FILE.xls;
        break;
      case MIME_TYPE.DOC:
      case MIME_TYPE.DOCX:
        previewEls = PREVIEW_FILE.doc;
        break;
      case MIME_TYPE.ZIP:
        previewEls = PREVIEW_FILE.zip;
        break;
      default:
        if (type.match(MIME_TYPE.IMAGE)) {
          previewEls = (
            <img className="img-fluid img-thumbnail " src={image} alt="" />
          );
        } else if (type.match(MIME_TYPE.AUDIO)) {
          previewEls = PREVIEW_FILE.mp3;
        } else if (type.match(MIME_TYPE.VIDEO)) {
          previewEls = PREVIEW_FILE.mov;
        } else {
          previewEls = PREVIEW_FILE.unknown;
        }
        break;
    }
    return previewEls;
  }, [type, image]);

  return (
    <div className="preview-image">
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (isFunction(onRemove)) {
            onRemove();
          }
        }}
      >
        <span aria-hidden="true" className="">
          &times;
        </span>
      </button>
      {els}
      <div className="title">{name}</div>
    </div>
  );
};

PreviewImage.propTypes = {
  image: PropTypes.any.isRequired,
  onRemove: PropTypes.func,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default PreviewImage;
