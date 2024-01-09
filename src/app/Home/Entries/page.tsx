"use client";
import { table } from "console";
import services from "@/services";
import { Data } from "@/utils";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { object } from "yup";

const Entries = () => {
	const router = useSearchParams().get("table");
	const [data, setData] = useState<Data[]>([]);

	useEffect(() => {
		const getSchema = async () => {
			try {
				const data = await services.getEntries(router as string);
				console.log("data", data);
				setData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
				setData([]);
			}
		};

		getSchema();
	}, [router]);

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
		<div className="overflow-x-auto mx-96 my-10 p-10 pt-5 border border-neutral-600">
			<table className="table">
				<thead>
					<tr>{tableHead()}</tr>
				</thead>
				<tbody>{showSchema()}</tbody>
			</table>
		</div>
	);
};

export default Entries;
