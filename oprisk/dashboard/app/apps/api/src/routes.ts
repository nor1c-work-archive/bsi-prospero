import { Routes } from "@nestjs/core";
import { MonitorModule } from "./components/monitor/monitor.module";

export const routes: Routes = [
    {
        path: '/monitoring-reporting',
        module: MonitorModule,
    }
]