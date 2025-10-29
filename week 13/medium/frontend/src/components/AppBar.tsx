export const AppBar = () => {
    return (
        <div className="flex justify-between p-4 items-center">
            <div className="text-xl font-bold">
                Medium
            </div>
            <div>
                <AvatarComponent name="Sagar"/>
            </div>
        </div>
    );
};

function AvatarComponent({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-mono text-gray-600 dark:text-gray-300 text-center text-lg">
        {name[0]}
      </span>
    </div>
  );
}