import { Subject, from, interval } from 'rxjs'
import { switchMap, take, takeUntil } from 'rxjs/operators'

let id = Math.floor(Math.random() * 100) + 1
let index = 1
const subject = new Subject()

const seconds = interval(1000)
    .pipe(
        takeUntil(subject),
        switchMap(() => from(fetch(`https://dummyjson.com/products/${id}`)
            .then((response => {
                return response.json()
            }))
            .finally(() => {
                const eventFinish = Math.floor(Math.random() * 100) + 1
                id = eventFinish
                console.log('index', index)
                if (index === 5) {
                    console.log('chegou aq')
                    subject.complete()
                }
                index++
            })
        ))
    )
        
    .subscribe(console.log)

    /*
    switchMap(() => from(fetch(`https://dummyjson.com/products/${id}`)
            .then((response => {
                return response.json()
            }))
            .finally(() => {
                const eventFinish = Math.floor(Math.random() * 100) + 1
                console.log('index', index)
                if (index === 5) {
                    subject.complete()
                }
                index++
            })
        )))
    */