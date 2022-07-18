type likeType = {
  name: string;
  profileImage: string;
  id: number;
};

type postType = {
  content: string;
  images: string[];
};

type PostActionInterface = {
  key: string;
  title: string;
  icon: React.ReactNode | React.ReactNode[];
};

type SymbolsType = {
  icon: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};
