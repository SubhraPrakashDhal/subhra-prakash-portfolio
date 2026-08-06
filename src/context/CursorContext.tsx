import React, { createContext, useContext, useState } from 'react';

export type CursorVariant = 'default' | 'hover' | 'magnetic' | 'project' | 'button' | 'nav' | 'text' | 'hidden';

interface CursorContextType {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  setCursorHover: (text?: string, variant?: CursorVariant) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const setCursorHover = (text: string = '', variant?: CursorVariant) => {
    let targetVariant: CursorVariant = variant || 'hover';

    if (!variant && text) {
      const upperText = text.trim().toUpperCase();
      if (['HOME', 'ABOUT', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'SERVICES', 'ACHIEVEMENTS', 'CONTACT'].includes(upperText)) {
        targetVariant = 'nav';
      } else if (upperText === 'PROJECT' || upperText === 'VIEW PROJECT' || upperText.includes('PROJECT')) {
        targetVariant = 'project';
      } else if (['CLICK', 'SUBMIT', 'SEND', 'DOWNLOAD', 'EXPLORE', 'GET IN TOUCH', 'MORE', 'BUTTON'].includes(upperText)) {
        targetVariant = 'button';
      }
    }

    setCursorVariant(targetVariant);
    setCursorText(text);
    setIsHovered(true);
  };

  const resetCursor = () => {
    setCursorVariant('default');
    setCursorText('');
    setIsHovered(false);
  };

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        setCursorVariant,
        cursorText,
        setCursorText,
        isHovered,
        setIsHovered,
        setCursorHover,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
