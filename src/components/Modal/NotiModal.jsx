import React, { Fragment, memo } from "react";

function NotiModal({ isOpen, closeModal, modalContent }) {
    return (
        <Fragment>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className={`modal modal-bottom sm:modal-middle ${isOpen && "modal-open"}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{modalContent.title}</h3>
                    <p className="py-4">{modalContent.description}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn" onClick={closeModal}>
                            Ok!
                        </label>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default memo(NotiModal);
