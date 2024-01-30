"use client";
import axiosInstance from "@/utils/axios";
import { useSearchParams } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const BulkEntry = () => {
  const [file, setFile] = useState<File | null>(null);
  const route = useSearchParams().get("table");
  const uploadFile = (e: SyntheticEvent) => {
    e.preventDefault();
    (async () => {
      const formData = new FormData();
      formData.append("file", file as File);
      await axiosInstance.post(`/${route}/bulk`, formData);
    })();
  };

  return (
    <dialog className="modal" id="Modal_AddBulk">
      <form className="modal-box form-control" onSubmit={uploadFile}>
        <h1 className="text-xl py-2 font-bold">Bulk Entry</h1>
        <p className="py-2">
          Upload a File with Supported Formats: .xlsx, .json, .txt
        </p>
        <label className="label label-text text-sm text-gray-500">
          Choose a File
        </label>
        <input
          type="file"
          accept=".txt, .xlsx, .json"
          className="file-input file-input-bordered "
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="btn btn-primary w-20 mt-4">
          Upload
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default" />
      </form>
    </dialog>
  );
};

export default BulkEntry;
