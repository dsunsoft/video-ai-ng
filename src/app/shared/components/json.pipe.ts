import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
    name: 'json'  // 使用时的名称
})
export class JsonPipe implements PipeTransform{

    transform(value) {
        var result = '';
        if(value != undefined && value != null) {
            result = JSON.stringify(value);
        }
		return result;
    }
}
