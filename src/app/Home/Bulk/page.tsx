"use client";
import axiosInstance from "@/utils/axios";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const Bulk = () => {
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
		<div>
			<form className="form-control w-72" onSubmit={uploadFile}>
				<label className="label label-text text-lg">Pick a file</label>
				<input
					type="file"
					accept=".txt"
					className="file-input file-input-bordered "
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<button type="submit" className="btn btn-primary w-20">
					upload
				</button>
			</form>
		</div>
	);
};

export default Bulk;
