import React, {ReactNode} from "react";

interface PalgakalkulaatorLayoutProps {
    children: ReactNode;
}

const PalgakalkulaatorLayout: React.FC<PalgakalkulaatorLayoutProps> = ({ children }) => {
    return (

        <div className="flex flex-col mt-8 gap-y-8 w-full md:mx-auto md:w-2/3 md:max-w-[820px]">
            {children}
        </div>
            
            
        
    );
};
export default PalgakalkulaatorLayout;