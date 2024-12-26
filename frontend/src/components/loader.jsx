import React from 'react';

const Loader = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#ececec',
            }}
            className='relative'
        >
            {/* SVG Loader */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                width="200"
                style={{ shapeRendering: 'auto', display: 'block' }}
            >
                <g transform="translate(20, 50)">
                    <circle fill="#4a6d7e" r="6" cx="0" cy="0">
                        <animate
                            attributeName="r"
                            from="6"
                            to="12"
                            dur="0.8s"
                            repeatCount="indefinite"
                            begin="0s"
                        />
                    </circle>
                </g>
                <g transform="translate(40, 50)">
                    <circle fill="#4a6d7e" r="6" cx="0" cy="0">
                        <animate
                            attributeName="r"
                            from="6"
                            to="12"
                            dur="0.8s"
                            repeatCount="indefinite"
                            begin="0.2s"
                        />
                    </circle>
                </g>
                <g transform="translate(60, 50)">
                    <circle fill="#4a6d7e" r="6" cx="0" cy="0">
                        <animate
                            attributeName="r"
                            from="6"
                            to="12"
                            dur="0.8s"
                            repeatCount="indefinite"
                            begin="0.4s"
                        />
                    </circle>
                </g>
                <g transform="translate(80, 50)">
                    <circle fill="#4a6d7e" r="6" cx="0" cy="0">
                        <animate
                            attributeName="r"
                            from="6"
                            to="12"
                            dur="0.8s"
                            repeatCount="indefinite"
                            begin="0.6s"
                        />
                    </circle>
                </g>
            </svg>
            <h1 className='absolute top-[390px] font-bold text-3xl text-slate-800'>Loading...</h1>

            {/* Text Below SVG */}
            {/* <p
                style={{
                    marginTop: '20px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#4a6d7e',
                }}
            >
                Loading, please wait...
            </p> */}
        </div>
    );
};

export default Loader;
