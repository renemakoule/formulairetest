// components/Accordion.tsx

import { useState } from "react";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-red-500">
      <button
        className="flex justify-between w-full p-4 text-left text-teal-700 font-semibold focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={`transform ${isOpen ? "rotate-45" : "rotate-0"} transition-transform`}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="p-4 text-gray-700 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 border border-red-500">
      <AccordionItem title="Formulaires de marques">
        Contenu pour Formulaires de marques
      </AccordionItem>
      <AccordionItem title="Télécharger des exemples de documents-types pour les marques">
        Contenu pour Télécharger des exemples de documents-types pour les marques
      </AccordionItem>
      <AccordionItem title="Autres Formulaires">
        Contenu pour Autres Formulaires
      </AccordionItem>
    </div>
  );
};

export default Accordion;
