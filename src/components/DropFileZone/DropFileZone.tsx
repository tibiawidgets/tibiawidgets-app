import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  ItemTemplateOptions
} from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export default function DropFileZone() {
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const [filesCount, setFilesCount] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    const { files: newFiles } = e;

    Object.keys(newFiles).forEach((key) => {
      _totalSize += newFiles[key].size || 0;
    });

    setTotalSize(_totalSize);
    setFilesCount((prev) => {
      return prev + newFiles.length;
    });
  };

  const onBeforeDrop = (e: DragEvent) => {
    const files = e.dataTransfer
      ? e.dataTransfer.files
      : e.originalEvent.dataTransfer
      ? e.originalEvent.dataTransfer.files
      : e.originalEvent.currentTarget.files;
    let error = false;
    Object.keys(files).forEach((idx) => {
      if (!files[idx].name.match(/(.*\.json|\.txt)$/)) {
        error = true;
      }
    });
    return !error;
  };

  const onBeforeSelect = (e: FileUploadSelectEvent) => {
    const files = e.dataTransfer
      ? e.dataTransfer.files
      : e.originalEvent.dataTransfer
      ? e.originalEvent.dataTransfer.files
      : e.originalEvent.currentTarget.files;
    let error = false;
    Object.keys(files).forEach((idx) => {
      if (!files[idx].name.match(/(.*\.json|\.txt)$/)) {
        error = true;
      }
    });
    return !error;
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file: File) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    setFilesCount((prev) => prev - 1);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    setFilesCount(0);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <Tag value={`${filesCount} files`} severity="warning" className="px-3 py-2" />
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }} />
        </div>
      </div>
    );
  };

  const itemTemplate = (file: object, { formatSize, onRemove }: ItemTemplateOptions) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '40%' }}>
          <i className="pi pi-file" />
          <span className="flex flex-column text-left ml-3">{file.name}</span>
        </div>
        <Tag value={formatSize} severity="warning" className="px-3 py-2" />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-file-import mt-3 p-5"
          style={{
            fontSize: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)'
          }}
        />
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
          Drag and Drop Hunt Sessions Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-plus',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined'
  };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
  };
  const onError = () => {};

  return (
    <div>
      <Toast ref={toast} />

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="huntSessionsUpload"
        url="/api/upload"
        multiple
        accept=".json,.txt"
        maxFileSize={1000000}
        onUpload={onTemplateUpload}
        onBeforeDrop={onBeforeDrop}
        onBeforeSelect={onBeforeSelect}
        onError={onError}
        onSelect={onTemplateSelect}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        className="mt-4"
        contentClassName="surface-1"
      />
    </div>
  );
}
