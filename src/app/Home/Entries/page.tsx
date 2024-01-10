"use client";
import services from "@/services";
import { Data } from "@/utils";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { object } from "yup";

const Entries = () => {
	const route = useSearchParams().get("table");
	const [data, setData] = useState<Data[]>([]);
	const router = useRouter();
	const [error, setError] = useState(false);

	useEffect(() => {
		const getSchema = async () => {
			try {
				const data = await services.getEntries(route as string);
				console.log("data", data);
				setData(data);
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

	const tableHead = () => {
		if (!data || !data[0]) {
			return null;
		}
		return Object.entries(data ? data[0] : {}).map(([name, _]) => {
			return <th key={name}>{name}</th>;
		});
	};

	const showSchema = () => {
		return data?.map((attr) => (
			<tr key={attr.EmployeeID}>
				{Object.entries(attr).map(([key, value]) => (
					<td key={key}>
						{typeof value === "boolean" ? String(value) : value}
					</td>
				))}
			</tr>
		));
	};

	return (
		<>
			<div
				className={`overflow-x-auto mx-96 my-10 p-10 pt-5 border border-neutral-600 ${
					!data || data.length !== 0 ? "block" : "hidden"
				}`}
			>
				<table className="table">
					<thead>
						<tr>{tableHead()}</tr>
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

export default Entries;
