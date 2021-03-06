import { TestBed, inject } from '@angular/core/testing';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import { JhiLanguageService } from '../../src/language/language.service';
import { ConfigService } from '../../src/config.service';

class TranslateLoaderMock {
    public setLocations(locaions: string[]) { }
}

class TranslateServiceMock {
    private lang: string;
    private currentLoader: TranslateLoaderMock;

    constructor() {
        this.currentLoader = new TranslateLoaderMock();
    }

    public getTranslation(): string {
        return this.lang;
    }

    public setDefaultLang(lang: string) { }

    public setLocations(locations: string[]) { }

    public resetLang(lang: string) { }

    public use(lang: string): Observable<any> {
        return Observable.of();
    }
}

describe('LanguageService Test', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                JhiLanguageService,
                {
                    provide: TranslateService,
                    useClass: TranslateServiceMock
                },
                {
                    provide: ConfigService,
                    useValue: new ConfigService({})
                }

            ]
        });
    });

    it('should change Language', inject([JhiLanguageService], (service: JhiLanguageService) => {
        service.changeLanguage('fr');
        expect(service.getCurrent()).toEqual(Promise.resolve('fr'));
    }));

    it('should retain changed language even after force refresh', inject([JhiLanguageService], (service: JhiLanguageService) => {
        service.changeLanguage('fr');
        service.init();
        expect(service.getCurrent()).toEqual(Promise.resolve('fr'));
    }));

});
