import { Component, ElementRef, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AuthService } from 'src/app/auth.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
@Component({
  selector: 'angular-abc',
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.scss']
})
export class AbcComponent {
  @ViewChild("btn1") btn1: ElementRef<HTMLDivElement>;
  @ViewChild("btn2") btn2: ElementRef<HTMLDivElement>;
  @ViewChild("btn3") btn3: ElementRef<HTMLDivElement>;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  @ViewChild("corporation", { read: ElementRef }) corporation: ElementRef;
  // title = 'AnhHuy6';
  tinhThanh: any[]
  title = 'My first AGM project';
  lat = 21.0245;
  lng = 105.8412;
  mapType = "normal"
  googleMapType = 'satellite';
  markerlat = 21.0245;
  markerlng = 105.8412;
  zoom = 10
  ngay: string = "";
  label: string
  nameTinhThanh: string
  temp5day: any[] = []
  tempbtn: boolean = true;
  rainbtn: boolean = false
  windbtn: boolean = false
  widthOld: number
  newBtn: any
  newbtn1: any
  newbtn2: any
  newbtn3: any
  constructor(private authService: AuthService) {
    this.getTinhThanh()
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [
            // 10, 41, 35, 51, 49, 12
          ]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "right"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          // "23-2",
          // "23-2",
          // "23-2",
          // "23-2",
          // "23-2",
          // "23-2",
        ]
      }
    };
    this.getCallApiMap({ q: 'Ha Noi' })

  }

  isLogined(): boolean {
    return this.authService.isLogin();
  }
   getCallApiMap(data: any) {
    this.authService.getApiMap(data).subscribe( (data: any) => {
      console.log(data)
      this.temp5day = []
      this.ngay = "";
      this.lat = data.city.coord['lat']
      this.lng = data.city.coord['lon']
      this.markerlat = data.city.coord['lat']
      this.markerlng = data.city.coord['lon']
      data.list.forEach((element: any) => {
        let ngayData = element['dt_txt'].slice(0, 11).trim()
        // console.log('element', element['dt_txt'])
        // console.log('ngayData', ngayData)
        if (ngayData !== this.ngay) {
          this.ngay = ngayData
          this.temp5day.push(element)
        }
      });
      console.log('tem', this.temp5day)
      const ngayNew =  this.getChart(this.temp5day).map((element: any) => {
        return element.replaceAll("2023-", "")
      })
      const tempNew =  this.getTemp(this.temp5day)
      const rainNew =  this.getRain(this.temp5day)
      const windNew =  this.getWind(this.temp5day)
      console.log('tempNew', tempNew)
      console.log('rainNew', rainNew)
      console.log('windNew', windNew)
      // this.chartOptions.xaxis ['categories'] = ngayNew;
      // this.chartOptions['series']['data'] = tempNew;
      this.chartOptions.xaxis = {
        categories: ngayNew
      }
      this.chartOptions.series = [{
        data: tempNew
      }];
      console.log('chartOptions', this.chartOptions)

    })
  }
  getChart(data: any) {
    const ngayNew = data.map((element: any) => {
      return element['dt_txt'].slice(0, 11).trim()
    })
    return ngayNew
  }
  getTemp(data: any) {
    const tempNew = data.map((element: any) => {
      let newTemp = element.main['temp'] - 273.15
      return parseInt(newTemp.toFixed(0));
    })
    return tempNew
  }
  getRain(data: any) {
    const tempRain = data.map((element: any) => {
      let Rain = element.pop
      return `${(Rain.toFixed(0)) * 100}%`
    })
    return tempRain
  }
  getWind(data: any) {
    const tempWind = data.map((element: any) => {
      let Wind = element.wind.speed
      return `${Wind.toFixed(2)} km/h`
    })
    return tempWind
  }
  async getTinhThanh() {
    this.tinhThanh = []
    this.authService.getTinhThanh().subscribe(data => {
      console.log('tinh', data)
      this.tinhThanh = data
    })
  }
  getDay(item: any) {
    let b = new Date(item.dt_txt)
    let c = b.getDay()
    let day;
    switch (c) {
      case 0:
        day = 'CN'
        break;
      case 1:
        day = 'Thứ 2'
        break;
      case 2:
        day = 'Thứ 3'
        break;
      case 3:
        day = 'Thứ 4'
        break;
      case 4:
        day = 'Thứ 5'
        break;
      case 5:
        day = 'Thứ 6'
        break;
      case 6:
        day = 'Thứ 7'
        break;
    }
    return day
  }
  getChange(item: any) {
    console.log('item', item.target)
  }
  timKiem(event: any) {
    console.log('form', this.corporation.nativeElement)
    const corporationObj = this.corporation.nativeElement.value;
    let newText = this.removeAccents(corporationObj)
    this.label = newText
    let data = {
      q: newText
    };
    this.getCallApiMap(data)
  }
  removeAccents(str: any) {
    let newText;
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
      newText = str.replace("Thanh pho ", "")
    }
    return newText;
  }
  changeBtn(event: any, num: number) {
    if (!this.temp5day.length) {
      return
    }
    if (num === 1) {
      this.newBtn.style.width = `${this.newbtn1}px`;
      this.newBtn.style.left = `0px`
      this.chartOptions.series = [{
        data: this.getTemp(this.temp5day)
      }];
      return
    } else if (num === 2) {
      this.newBtn.style.left = `${this.newbtn1 + 8}px`
      this.newBtn.style.width = `${this.newbtn2}px`;
      this.chartOptions.series = [{
        data: this.getRain(this.temp5day)
      }];
    } else {
      this.newBtn.style.width = `${this.newbtn3}px`;
      this.newBtn.style.left = `${this.newbtn1 + this.newbtn2 + 15}px`
      this.chartOptions.series = [{
        data: this.getWind(this.temp5day)
      }];
    }
  }
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};