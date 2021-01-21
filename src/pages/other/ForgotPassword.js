import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import WebService from '../../util/webService';
import constant from '../../util/constant';
// import { setLocalData, isValidObject } from '../../util/helper';
import { setLoader } from "../../redux/actions/loaderActions";
// import { setUser, getCountry, getState } from "../../redux/actions/userAction";
// import { addToCart, getCart } from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";
const forgotForm = {
    username: {
        name: "username",
        validate: {
            required: {
                value: true,
                message: "Email is required"
            },
            pattern: {
                value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                message: 'Please entered the valid email id'
            }
        }
    },
};

const ForgotPassword = ({ strings, props, location, setLoader, defaultStore }) => {
    // const { pathname } = location;
    const { addToast } = useToasts();
    // const history = useHistory();
    const { register, handleSubmit, errors, reset } = useForm({
        mode: "onChange",
        defaultValues: { username: "" },
        criteriaMode: "all"
    });
    const onSubmit = async (data) => {
        setLoader(true)
        try {
            let action = constant.ACTION.CUSTOMER + constant.ACTION.PASSWORD + constant.ACTION.RESET + constant.ACTION.REQUEST;
            let param = { "username": data.username }
            await WebService.post(action, param);
            // if (response) {
            reset({})
            addToast("A Reset password link has been sent to the email address please check email.", { appearance: "success", autoDismiss: true });
            // }
            setLoader(false)
        } catch (error) {
            addToast("Customer is not found", { appearance: "error", autoDismiss: true });
            setLoader(false)
        }
    }
    return (
        <Fragment>
            <MetaTags>
                <title>Shopizer | My Account</title>
                {/* <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        /> */}
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={"/login"}>
                My Account
                 </BreadcrumbsItem>
            <LayoutOne headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-2"
                headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <Tab.Container defaultActiveKey={'forgot-password'}>
                                        <Nav variant="pills" className="login-register-tab-list">
                                            <Nav.Item>
                                                <Nav.Link eventKey="forgot-password">
                                                    <h4>Forgot Password</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="forgot-password">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form onSubmit={handleSubmit(onSubmit)} >
                                                            <p>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
                                                            <div className="login-input">
                                                                <input
                                                                    type="text"
                                                                    name={forgotForm.username.name}
                                                                    placeholder={strings["Email address"]}
                                                                    ref={register(forgotForm.username.validate)}
                                                                />

                                                                {errors[forgotForm.username.name] && <p className="error-msg">{errors[forgotForm.username.name].message}</p>}
                                                            </div>
                                                            <div className="button-box">
                                                                <div className="login-toggle-btn">
                                                                    {/* <input type="checkbox" /> */}
                                                                    <label className="ml-30"></label>
                                                                    <Link to={"/login"}>
                                                                        Go to login
                                                                    </Link>
                                                                </div>
                                                                <button type="submit">
                                                                    <span>Reset Password</span>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment >
    );
};

ForgotPassword.propTypes = {
    location: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        defaultStore: state.merchantData.defaultStore,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setLoader: (value) => {
            dispatch(setLoader(value));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(ForgotPassword));
            // export default LoginRegister;
