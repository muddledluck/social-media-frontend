type likeType = {
  name: string;
  profileImage: string;
  id: number;
};

type PostActionInterface = {
  key: string;
  title: string;
  icon: React.ReactNode | React.ReactNode[];
  isVisible: boolean;
  onClick?: () => any;
  disabled?: boolean;
};

type SymbolsType = {
  icon: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};
