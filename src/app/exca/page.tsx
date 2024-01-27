"use client";
import { useEffect, useState } from "react";
export default function App() {
	const [Excalidraw, setExcalidraw] = useState(null);
	useEffect(() => {
		import("@excalidraw/excalidraw").then((comp) =>
			setExcalidraw(comp.Excalidraw),
		);
	}, []);
	return (
		<>
			{Excalidraw && (
				<>
					<h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
					<div style={{ height: "500px" }}>
						<Excalidraw />
					</div>
				</>
			)}
		</>
	);
}
