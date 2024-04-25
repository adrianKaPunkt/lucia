import BarChartBox from './_components/BarChartBox';
import BoxOne from './_components/BoxOne';
import ChartBox from './_components/ChartBox';
import {
  chartBoxUser,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxConversion,
  barChartBoxRevenue,
  barChartBoxVisit,
} from '@/app/admin/charts/_components/dashboard-data';
import PieChartBox from './_components/PieChartBox';
import BigChartBox from './_components/BigChartBox';

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      <div className="dashboard-box col-span-1 row-span-3">
        <BoxOne />
      </div>
      <div className="dashboard-box col-span-1 row-span-1">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="dashboard-box col-span-1 row-span-1">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="dashboard-box col-span-1 row-span-3">
        <PieChartBox />
      </div>
      <div className="dashboard-box col-span-1 row-span-1">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="dashboard-box col-span-1 row-span-1">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="dashboard-box col-span-2 row-span-2">
        <BigChartBox />
      </div>
      <div className="dashboard-box col-span-1 row-span-1">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
      <div className="dashboard-box col-span-1 row-span-1">
        <BarChartBox {...barChartBoxVisit} />
      </div>
    </div>
  );
};
export default DashboardPage;
