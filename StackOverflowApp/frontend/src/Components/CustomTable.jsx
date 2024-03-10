import React from "react";

function CustomTable({ questions, answers, comments }) {
	if (questions)
		return (
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Created</th>
						<th>Updated</th>
					</tr>
				</thead>
				<tbody>
					{questions.map(({ qid, title, description, created, updated }) => (
						<tr key={qid}>
							<td>{title}</td>
							<td>{description}</td>
							<td>{processDate(created)}</td>
							<td>{processDate(updated)}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	else if (answers) {
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Description</th>
					<th>Created</th>
					<th>Updated</th>
				</tr>
			</thead>
			<tbody>
				{answers.map(({ aid, description, created, updated }) => (
					<tr key={aid}>
						<td>{description}</td>
						<td>{processDate(created)}</td>
						<td>{processDate(updated)}</td>
					</tr>
				))}
			</tbody>
		</table>;
	} else {
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Description</th>
					<th>Created</th>
					<th>Updated</th>
				</tr>
			</thead>
			<tbody>
				{comments.map(({ cid, description, created, updated }) => (
					<tr key={cid}>
						<td>{description}</td>
						<td>{processDate(created)}</td>
						<td>{processDate(updated)}</td>
					</tr>
				))}
			</tbody>
		</table>;
	}
}

const processDate = (date) => {
	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const formattedTime = new Date(date).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	return formattedDate + " • " + formattedTime;
};

export default CustomTable;
