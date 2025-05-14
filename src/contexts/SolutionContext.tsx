import { createContext, useContext } from "react";

type SolLink = {
  name: string;
  path: string;
};

const solLinks: SolLink[] = [
  { name: "Small Bussiness", path: "Small-Bussiness" },
  { name: "Freelancers", path: "Freelancers" },
  { name: "Customers", path: "Customers" },
  { name: "Taxes", path: "Taxes" },
];

const SolLinksContext = createContext<SolLink[]>(solLinks);

export const useSolutionLinks = () => useContext(SolLinksContext);

export const SolutionLinksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <SolLinksContext.Provider value={solLinks}>
    {children}
  </SolLinksContext.Provider>
);
