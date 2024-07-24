# Generator objects

## Props
```
{
    length?: [min: number, max: number] | number
    template: {
        [key: string]: '{{functionGenerator(props)}}' | (obj: resultObj, func: functionGenerator) => any | any
    }
}
```

## functionGenerator 
```
uid: () => string
index: () => position from array
bool: () => boolean
floating: (max: number, min: number, rounding: number = 2) => random floating number
integer: (max: number, min: number) => random integer number
word: (length: number) => random word
loremParagraf: (length: number) => string
lorem: (paragrafNumber: number, length: number = 15) => string
phone: () => string
```

## Template 

```
new GeneratorObjects({
    length: 1,
    template: {
        id: '{{uid(2, 4, 5)}}',
        i: '{{index()}}',
        test: (obj, func) => obj.age > 30 ? '+30' : '+20',
        title: '{{word(15)}}',
        description: '{{lorem(2, 30)}}',
        author: '{{word(7)}}',
        state: (_, func) => func.bool() ? 'draft' : 'published',
        body: '{{lorem(10, 30)}}',
        readCount: '{{integer(1, 10)}}',
        readingTime: '{{integer(1, 10)}}',
        tags: [5, '{{word(6)}}'],
        timestamp:  (_, func) => Date.now()
    } 
})
```

### Result
```
{
    "id": "lyzre71z7h1j1g5bqit",
    "i": 1,
    "test": "+20",
    "title": "hrKW0ZonKkzVMHR",
    "description": "vel suscipit et convallis rhoncus habitasse vestibulum viverra hac interdum tempus lacinia erat fringilla enim ut accumsan etiam fringilla pretium congue accumsan lacinia dui cursus primis et elit torquent etiam.\ninteger accumsan sociosqu himenaeos faucibus mi diam mauris sodales consequat ultricies feugiat sociosqu nostra massa vehicula ut consequat nisi etiam hac condimentum duis adipiscing proin aptent hendrerit luctus consequat in.\n",
    "author": "ihM4ogc",
    "state": "draft",
    "body": "urna tincidunt adipiscing bibendum justo dapibus consequat nam a quam magna posuere aliquet aptent faucibus curae dolor venenatis nulla cursus ornare ullamcorper congue diam risus ligula tortor morbi posuere massa.\ninterdum senectus senectus gravida id arcu mi habitant venenatis tortor sit ornare arcu proin pharetra hac cubilia taciti taciti pretium lacinia rutrum hac pharetra curae nam feugiat aenean euismod commodo.\nest est mauris nec fringilla interdum habitasse iaculis nibh rhoncus aliquet fermentum phasellus scelerisque aliquet facilisis lorem dictum lobortis sociosqu felis mauris consectetur vivamus scelerisque ultricies rhoncus tempor condimentum bibendum.\naugue nisl dolor morbi facilisis eget platea conubia purus felis integer commodo bibendum quisque quisque eleifend rutrum himenaeos ultricies aenean tellus lacus sociosqu rutrum pulvinar dui arcu faucibus duis odio.\ngravida praesent condimentum suspendisse aenean eleifend inceptos metus tristique tellus nisi proin nisl commodo nostra orci sapien ipsum mi aliquet tempus facilisis suscipit habitasse iaculis nibh auctor sollicitudin orci fringilla.\nhabitasse condimentum ultricies velit curabitur convallis sed cursus aptent sapien nisl dictumst iaculis pulvinar nulla cras cubilia vivamus cras inceptos scelerisque mattis arcu ante eros in condimentum placerat et risus.\nproin fames massa auctor egestas class massa posuere non proin faucibus sit blandit lectus suscipit morbi ante nostra primis a congue dictumst dolor nisi velit diam curae sem himenaeos vitae.\neu egestas inceptos ornare enim tincidunt risus non primis convallis eros turpis pellentesque sit erat ad risus potenti purus aenean ac nulla sodales purus himenaeos porttitor purus aliquam ultricies dictumst.\nsed laoreet sollicitudin quam neque curae neque etiam sociosqu taciti urna aliquam iaculis blandit eros curae non dui lacus tortor etiam congue felis fermentum arcu morbi rhoncus urna dolor tellus.\ngravida velit venenatis congue quam molestie litora lacinia felis viverra scelerisque lobortis fusce faucibus etiam viverra iaculis libero magna enim aenean lectus primis ultrices nibh libero metus fusce torquent a.\n",
    "readCount": 6,
    "readingTime": 7,
    "tags": [
        "k3toTv",
        "Sq4x7g",
        "bOVmh6",
        "uXoeLr",
        "miMiXr"
    ],
    "timestamp": 1721820373561
}
```
