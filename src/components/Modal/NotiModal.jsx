import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
function NotiModal({ isOpen, closeModal, modalContent, isShow }) {
    return (
        <Fragment>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className={`modal modal-bottom sm:modal-middle ${isOpen && "modal-open"}`}>
                <div className="modal-box font-mono">
                    <h3 className="font-bold text-lg uppercase">{modalContent.title}</h3>
                    <p className="py-4">{modalContent.description}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn w-20" onClick={closeModal}>
                            Ok!
                        </label>
                        {/* {isShow && (
                            <Link>
                                <label htmlFor="my-modal-6" className="btn w-20">
                                    Nạp coin.
                                </label>
                            </Link>
                        )} */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default memo(NotiModal);
