import {Injectable} from '@angular/core';
import {ApiClientService} from "./api-client.service";
import {BrandingResponse} from "../types/branding.response";

@Injectable({
    providedIn: 'root'
})
export class BrandingService {
    branding?: BrandingResponse;

    constructor(private api: ApiClientService) {
        this.api.getBrand().subscribe((branding) => {
            this.branding = branding;
        })
    }
}
