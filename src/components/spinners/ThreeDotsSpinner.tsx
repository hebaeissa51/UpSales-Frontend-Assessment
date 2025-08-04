import { ThreeDots } from "react-loader-spinner";

function ThreeDotsSpinner() {
    return (
        <div className="flex justify-center pb-5">
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#0E9F6E"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}

export default ThreeDotsSpinner;