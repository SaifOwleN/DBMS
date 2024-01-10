"use client";
import { table } from "console";
import services from "@/services";
import { TableDefinition, Tables } from "@/utils";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { object } from "yup";

const Schema = () => {
	const route = useSearchParams().get("table");
	const [schema, setSchema] = useState<TableDefinition[]>([]);
	const [error, setError] = useState(false);

	const router = useRouter();
	useEffect(() => {
		const getSchema = async () => {
			try {
				const tablesData: Tables = await services.getSchema();
				setSchema(tablesData[route as string]);
			} catch (err) {
				if (err instanceof AxiosError) {
					if (err.response?.status === 401) {
						setError(true);
						localStorage.removeItem("SignedUser");
						setTimeout(() => {
							setError(false);
							router.push("/login");
						}, 5000);
					}
				}
			}
		};

		getSchema();
	}, [route]);

	const showSchema = () => {
		return schema?.map((attr) => (
			<tr key={attr.name}>
				<td>{attr.name}</td>
				<td>{attr.type}</td>
				<td>{String(!attr.allowNull)}</td>
			</tr>
		));
	};

	return (
		<>
			<div
				className={`  my-10 p-10 pt-5  ${
					!schema || schema.length !== 0 ? "block" : "hidden"
				}`}
			>
				<table className="table">
					<thead>
						<tr>
							<th>Column</th>
							<th>Type</th>
							<th>Required</th>
						</tr>
					</thead>
					<tbody>{showSchema()}</tbody>
				</table>
			</div>
			<div className={`toast m-6 ${error ? "block" : "hidden"}`}>
				<div className="alert alert-error flex items-center">
					<span className="text-xl">
						<BiSolidError />
					</span>
					session expired. redirecting to login page
				</div>
			</div>
		</>
	);
};

export default Schema;
