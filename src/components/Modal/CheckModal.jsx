import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
function NotiModal({ isOpen, closeModal, modalContent, confirm }) {
    return (
        <Fragment>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className={`modal modal-bottom sm:modal-middle ${isOpen && "modal-open"}`}>
                <div className="modal-box font-mono">
                    <h3 className="font-bold text-lg uppercase">{modalContent.title}</h3>
                    <p className="py-4">{modalContent.description}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn w-20" onClick={confirm}>
                            Yes!
                        </label>
                        <label htmlFor="my-modal-6" className="btn w-20" onClick={closeModal}>
                            No.
                        </label>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default memo(NotiModal);
