//?
import { useEffect, useState } from "react";
import { Avatar, Popover, message } from "antd";
import { useNameContext } from "./context/NameContext";
import { UserOutlined } from "@ant-design/icons";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Users from "./Users";
import Result403 from "../components/Result";

//?
const avatarStyle = {
	backgroundColor: "#87d068",
	position: "fixed",
	top: "50px",
	right: "50px",
	cursor: "pointer",
};

const override = css`
	display: block;
	margin-top: 9px;
	border-color: "red";
`;

// todo
export default function UserButton() {
	//
	const [name, setName] = useNameContext();
	const [loading, setLoading] = useState(false);

	//
	useEffect(() => {
		setLoading(true);
		async function getName() {
			try {
				const response = await fetch("/users/name");
				const result = await response.json();

				if (response.ok) {
					setName(result);
				} else {
					console.log(result);
				}
			} catch (err) {
				message.error(err.message);
			}
			setLoading(false);
		}

		getName();
	}, [setName]);

	//
	return (
		<>
			<Popover placement="bottomRight" trigger="click" content={Users}>
				<Avatar key="main" style={avatarStyle} size={40}>
					{loading ? (
						<ClipLoader
							color="#fff"
							css={override}
							size={22}
							style={{ marginTop: "14px" }}
						/>
					) : name ? (
						name[0]?.toUpperCase()
					) : (
						<UserOutlined style={{ verticalAlign: 2 }} />
					)}
				</Avatar>
			</Popover>
			{loading || (!name && <Result403 />)}
		</>
	);
}
