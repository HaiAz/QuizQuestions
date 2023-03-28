import React from "react";
import { AiOutlineFlag } from "react-icons/ai";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
export default function Quizz() {
    const { id } = useParams();
    // const examRef = collection(db, `exams`)
    return (
        <div>
            <div className="ml-8 mt-4">
                <h1 className="text-3xl">Câu 1</h1>
                <div className="flex mt-6">
                    <input type="radio" name="radio-5" className="radio radio-success" />
                    <span className="ml-3 text-xl">2 3 con vịt, em cho anh thịt</span>
                </div>
                <div className="flex mt-6">
                    <input type="radio" name="radio-5" className="radio radio-success" />
                    <span className="ml-3 text-xl">2 3 con vịt, em cho anh thịt</span>
                </div>
                <div className="flex mt-6">
                    <input type="radio" name="radio-5" className="radio radio-success" />
                    <span className="ml-3 text-xl">2 3 con vịt, em cho anh thịt</span>
                </div>
                <div className="flex mt-6">
                    <input type="radio" name="radio-5" className="radio radio-success" />
                    <span className="ml-3 text-xl">2 3 con vịt, em cho anh thịt</span>
                </div>
            </div>
            <div className="flex ml-12 mt-12 text-xl">
                <span className="mr-8">Phân vân</span>
                <AiOutlineFlag className="text-3xl" />
            </div>
            <div className="flex mx-32 mt-12">
                <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                    <button className="btn btn-info btn-outline text-2xl mx-4 my-2">
                        <span className="pr-3">Back</span>

                        <HiOutlineArrowSmLeft />
                    </button>
                </div>
                <div className="flex justify-center items-center mx-4 my-2 px-4 py-2">
                    <button className="btn btn-info btn-outline text-2xl mx-4 my-2">
                        <HiOutlineArrowSmRight />
                        <span className="pl-3">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
