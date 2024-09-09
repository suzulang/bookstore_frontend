import { useNavigate } from "react-router-dom";

function BookFooter({book}) {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate(`/books/${book._id}`);
	}

	return (
		<div className="text-2xl space-x-2 flex justify-end mt-2 items-center">
			<button onClick={handleButtonClick} className="btn btn-sm btn-primary">
				查看详情
			</button>
		</div>
	)
}

export default BookFooter