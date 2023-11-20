"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

function ErrorToast({ errorMsg, successMsg }) {
	useEffect(() => {
		if (errorMsg) {
			toast.error(`${errorMsg}`);
		}

		if (successMsg) {
			toast.error(`${successMsg}`);
		}
	}, [errorMsg, successMsg]);

	return null;
}

export default ErrorToast;
