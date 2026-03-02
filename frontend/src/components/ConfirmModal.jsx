import React from 'react';

const ConfirmModal = ({
    isOpen,
    title = 'Confirm',
    message = 'Are you sure you want to proceed?',
    onConfirm, confirmAction,
    onCancel,
    input1, input1Text,
    input2, input2Text,
    input1Value = '',
    input2Value = '',
    onInput1Change,
    onInput2Change
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-base-100 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                {input1 && input2 && (
                    <form>
                        {input1 && (
                            <>
                                <p>{input1Text} *</p>
                                <input
                                    className='input input-bordered mt-5 mb-5 w-full'
                                    type="email"
                                    value={input1Value}
                                    onChange={(e) => onInput1Change && onInput1Change(e.target.value)}
                                    required
                                />
                            </>
                        )}

                        {input2 && (
                            <>
                                <p>{input2Text} *</p>
                                <textarea
                                    className='textarea textarea-bordered mt-5 mb-5 w-full h-32'
                                    value={input2Value}
                                    onChange={(e) => onInput2Change && onInput2Change(e.target.value)}
                                />
                            </>
                        )}

                        <div className="flex justify-end gap-3">
                            <button className="btn btn-ghost" onClick={onCancel}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary text-white" onClick={onConfirm} value={confirmAction}>
                                {confirmAction}
                            </button>
                        </div>
                    </form>
                )}
                {!input1 && !input2 && (
                    <div className="flex justify-end gap-3">
                        <button className="btn btn-ghost" onClick={onCancel}>
                            Cancel
                        </button>
                        <button className="btn btn-primary text-white" onClick={onConfirm}>
                            {confirmAction}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmModal;
