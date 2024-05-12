
const breadcrumbItems = [{ title: "Home", link: "/dashboard/home" }];



import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <div className="hidden md:flex items-center space-x-2">
            <CalendarDateRangePicker />
            
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
         
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

           <Button >Plugga till ett prov</Button>
           <Button >Plugga till ett prov</Button>
           <Button >Plugga till ett prov</Button>
           <Button >Plugga till ett prov</Button>
           <div><Input type="text" placeholder="Vad behöver du hjälp med?" /><Button>Sök</Button></div>
           
           </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
