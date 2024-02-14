const VerifyIcon = (
    props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" {...props}>
        <g fill="none" fill-rule="nonzero">
            <path
                d="M12 2v6.5a1.5 1.5 0 0 0 1.5 1.5H20v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6Zm0 10a3 3 0 1 0 1.293 5.708l.707.706A1 1 0 0 0 15.414 17l-.706-.707A3 3 0 0 0 12 12Zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm2-11.957a2 2 0 0 1 1 .543L19.414 7a2 2 0 0 1 .543 1H14Z"
            />
        </g>
    </svg>
);

export default VerifyIcon;
