'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function SortBtn() {
    const [selectedChoice, setSelectedChoice] = useState('Sort by: Date');
    const [isOpen, setIsOpen] = useState(false);

    const handleSelection = (option) => {
        setSelectedChoice(`Sort by: ${option}`);
        setIsOpen(false);
    };

    return (
        <div>
            <details
                className="dropdown"
                open={isOpen}
                onToggle={(e) => setIsOpen(e.target.open)}
            >
                <summary className="btn font-medium bg-[#1a1a1a] text-white flex items-center justify-between">
                    <span>{selectedChoice}</span>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </summary>
                <ul className="font-medium bg-[#1a1a1a] border-2 border-white menu dropdown-content rounded-box z-[1] w-[155px] p-2 shadow-lg text-white">
                    <li>
                        <a onClick={() => handleSelection('Date')}><p className="text-[#def]">Date</p></a>
                    </li>
                    <li>
                        <a onClick={() => handleSelection('Name')}><p className='text-[#def]'>Name</p></a>
                    </li>
                </ul>
            </details>
        </div>
    );
}

export default SortBtn;
