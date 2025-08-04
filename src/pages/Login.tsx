import { LoginForm } from '../components/forms/LoginForm';

const Login = () => {
    return (
        <div className="container">
            <section className="centered h-[100vh]">
                <div className="w-[450px] rounded-[12px] bg-white text-center px-4 sm:px-5 py-5">
                    <h4 className="text-[25px] font-medium mb-2">Welcome back!</h4>
                    <p className="text-[#00000080] mb-5">Login to your account</p>
                    <LoginForm />
                </div>
            </section>
        </div>
    )
};

export default Login;
