import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ApmModule, ApmService } from '@elastic/apm-rum-angular';

import { routing } from './app.routes';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CatalogModule } from './catalog/catalog.module';
import { OrdersModule } from './orders/orders.module';
import { BasketModule } from './basket/basket.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [AppComponent],
    imports: [
        ApmModule,
        BrowserAnimationsModule,
        BrowserModule,
        ToastrModule.forRoot(),
        routing,
        HttpClientModule,
        // Only module that app module loads
        SharedModule.forRoot(),
        CatalogModule,
        OrdersModule,
        BasketModule
    ],
    providers: [
        ApmService,
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(service: ApmService) {
        // Agent API is exposed through this apm instance
        const apm = service.init({
            serviceName: 'angular-app',
            serverUrl: 'http://localhost:8200'
        })

        apm.setUserContext({
            'username': 'foo',
            'id': 'bar'
        })
    }
}
