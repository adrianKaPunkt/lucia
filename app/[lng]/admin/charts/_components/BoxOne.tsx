import { topDealUsers } from '@/app/admin/charts/_components/dashboard-data';

const BoxOne = () => {
  return (
    <div>
      <p className="text-xl font-bold mb-5">Top Deals</p>
      <div className="overflow-y-scroll h-[520px] w-full">
        {topDealUsers.map((user) => (
          <div
            key={user.id}
            className="flex justify-between mb-5 p-2 rounded-md cursor-pointer hover:bg-slate-700">
            <div className="flex gap-5 items-center">
              <img
                src={user.img}
                alt={user.username}
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{user.username}</span>
                <span className="text-xs">{user.email}</span>
              </div>
            </div>
            <span>${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BoxOne;
