"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, MoreVertical, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Business Overview</h1>
        <p className="text-muted-foreground">Take control of your business today!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Main Metric Card */}
        <Card className="col-span-1 lg:col-span-1 row-span-2 shadow-sm relative overflow-hidden bg-white border-none">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-xl">⚡</span> Revenue
            </div>
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold">$124.5k</span>
              <Badge variant="neon" className="font-bold">+12%</Badge>
            </div>
            
            <div className="relative h-64 w-full flex items-center justify-center">
              {/* Overlapping circles similar to the design */}
              <div className="absolute top-4 left-4 h-32 w-32 rounded-full bg-chart-5 opacity-80 flex flex-col items-center justify-center text-sidebar shadow-lg">
                <span className="text-xl font-bold">84k</span>
                <span className="text-xs font-medium">Sales</span>
              </div>
              <div className="absolute top-16 right-4 h-28 w-28 rounded-full bg-sidebar flex flex-col items-center justify-center text-white shadow-lg">
                <span className="text-lg font-bold">32k</span>
                <span className="text-xs font-medium">Services</span>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-accent flex flex-col items-center justify-center text-sidebar font-bold shadow-lg shadow-accent/20">
                <span className="text-lg">8.5k</span>
                <span className="text-[10px]">Other</span>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold flex items-center gap-2 text-lg">45<span className="text-muted-foreground text-sm font-normal">%</span></span>
                <span className="text-muted-foreground flex items-center gap-2">Sales <span className="h-2 w-2 rounded-full bg-chart-5 inline-block"></span></span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-chart-5 rounded-full" style={{ width: '45%' }}></div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold flex items-center gap-2 text-lg">30<span className="text-muted-foreground text-sm font-normal">%</span></span>
                <span className="text-muted-foreground flex items-center gap-2">Services <span className="h-2 w-2 rounded-full bg-sidebar inline-block"></span></span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-sidebar rounded-full" style={{ width: '30%' }}></div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold flex items-center gap-2 text-lg">25<span className="text-muted-foreground text-sm font-normal">%</span></span>
                <span className="text-muted-foreground flex items-center gap-2">Other <span className="h-2 w-2 rounded-full bg-accent inline-block"></span></span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6 col-span-1 lg:col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2 font-medium">
                  <Activity className="h-4 w-4" /> Active Orders
                </div>
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">142</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Avg</p>
                  <p className="text-xs text-muted-foreground">120 / day</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm relative overflow-hidden">
              <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-muted-foreground">%</span> Inventory Health
                </div>
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">94<span className="text-2xl text-muted-foreground">%</span></span>
                  <Badge variant="neon" className="font-bold">+2%</Badge>
                </div>
                {/* Simulated scatter plot background */}
                <div className="absolute bottom-2 right-2 h-24 w-48 opacity-40 pointer-events-none">
                  <div className="grid grid-cols-8 gap-1 h-full w-full">
                    {Array.from({length: 32}).map((_, i) => (
                      <div key={i} className={`rounded-full ${i % 3 === 0 ? 'bg-chart-5' : 'bg-secondary'} w-3 h-3 self-end`} style={{ marginBottom: `${Math.random() * 20}px` }}></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card variant="dark" className="flex-1 rounded-[2rem] p-2">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-white">
                <span className="opacity-80">📈</span> Sales Performance
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white cursor-pointer hover:bg-white/20 transition-colors">
                Monthly <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8 mb-8 mt-2">
                <div>
                  <div className="flex items-baseline gap-1 text-white">
                    <div className="h-4 w-1.5 bg-accent rounded-full mr-2"></div>
                    <span className="text-3xl font-bold">24<span className="text-xl opacity-70">%</span></span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Growth Rate</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 text-white">
                    <div className="h-4 w-1.5 bg-chart-5 rounded-full mr-2"></div>
                    <span className="text-3xl font-bold">12k</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Units Sold</p>
                </div>
              </div>

              {/* Bar Chart Simulation */}
              <div className="h-32 w-full flex items-end justify-between px-2 gap-2">
                {[40, 30, 50, 40].map((h, i) => (
                  <div key={`old-${i}`} className="w-1/6 flex justify-center gap-1">
                    <div className="w-full bg-white/10 rounded-t-md relative overflow-hidden" style={{ height: `${h}%` }}>
                       <div className="absolute inset-0 border-t border-dashed border-white/20"></div>
                    </div>
                  </div>
                ))}
                
                {/* Active Month (September in design) */}
                <div className="w-1/6 flex justify-center gap-1.5">
                  <div className="w-1/2 bg-accent rounded-t-md shadow-[0_0_15px_rgba(204,255,0,0.4)]" style={{ height: '80%' }}></div>
                  <div className="w-1/2 bg-chart-5 rounded-t-md shadow-[0_0_15px_rgba(179,157,255,0.4)]" style={{ height: '60%' }}></div>
                </div>

                {[30, 45, 55].map((h, i) => (
                  <div key={`new-${i}`} className="w-1/6 flex justify-center gap-1">
                    <div className="w-full bg-white/10 rounded-t-md relative overflow-hidden" style={{ height: `${h}%` }}>
                      <div className="absolute inset-0 border-t border-dashed border-white/20"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-white/50 mt-4 px-2 font-medium">
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span className="text-white flex items-center gap-1">Sept <ArrowUpRight className="h-3 w-3" /></span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}