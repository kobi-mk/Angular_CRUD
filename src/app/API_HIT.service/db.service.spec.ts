import { TestBed } from "@angular/core/testing";
import { DBservice } from "./db.service";

describe('DBservice', () => {
    let service: DBservice;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DBservice);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
})