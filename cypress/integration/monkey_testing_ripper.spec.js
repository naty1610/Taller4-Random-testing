describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomClick(10);
        
    })
    it('visits los estudiantes and survives monkeys with randomEvent', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })

})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function randomClick(monkeysLeft) {

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }   
}

function randomLlenarCampo(monkeysEvent) {
    cy.log(monkeysEvent);
    var word = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);

    var monkeys = monkeysEvent;
    if(monkeys > 0) {
        cy.get('input').then($inputs => {
            var randomCampo = $inputs.get(getRandomInt(0, $inputs.length));
            console.log(randomCampo);
            if(!Cypress.dom.isHidden(randomCampo)) {
                cy.wrap(randomCampo).click({ force: true }).type(word, { force: true })
                monkeys = monkeys - 1;
            }
            monkeys = monkeys - 1;
            cy.wait(1000);
            randomLlenarCampo(monkeys);
        });
    }   
}

function randomSelects(monkeysEvent) {

    var monkeysSelect = monkeysEvent;
    if(monkeysSelect > 0) {
        cy.get('select').then($selects => {
            var randomSelect = $selects.get(getRandomInt(0, $selects.length));
            console.log(randomSelect);
            if(!Cypress.dom.isHidden(randomSelect)) {
                var option = randomSelect.options[getRandomInt(0, randomSelect.options.length)];
                console.log(option);
                cy.wrap(randomSelect).select(option.value, { force: true });
                monkeysSelect = monkeysSelect - 1;
            }
            monkeysSelect = monkeysSelect - 1;
            cy.wait(1000);
            randomSelects(monkeysSelect);
        });
    }   
}

function randomBoton(monkeysEvent) {

    var monkeysButton = monkeysEvent;
    if(monkeysButton > 0) {
        cy.get('button').then($buttons => {
            var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
            console.log(randomButton);
            if(!Cypress.dom.isHidden(randomButton)) {
                cy.wrap(randomButton).click({ force: true })
                monkeysButton = monkeysButton - 1;
            }
            cy.wait(1000);
            randomBoton(monkeysButton);
        });
    }   
}


function randomEvent(monkeysLeft) {
    var arrayEvent = ["a","input","select", "button"];
    // Cantidad de monkeys a lanzar randomEvent  
    var monkeysLeft = monkeysLeft;
    // Cantidad de monkeys a lanzar por evento. Se busca probar todos los eventos que encuentre.
    var monkeysEvent = monkeysLeft;
   
    if(monkeysLeft > 0) {
        // Se busca aleatoreamente el evento
        var randomEvento =  arrayEvent[getRandomInt(0, arrayEvent.length)];
        cy.log('event: ' + randomEvento);
        // Se busca en el body
        cy.get('body').then($body => {
            if ($body.find(randomEvento).length > 0) {  
                switch (randomEvento) {
                    case 'a':
                        console.log('Click al azar');
                        randomClick(monkeysEvent);
                        break;
                    case 'input':
                        console.log('Llenar campo texto al azar');
                        randomLlenarCampo(monkeysEvent);
                        break;
                    case 'select':
                        console.log('Seleccionar combo al azar');
                        randomSelects(monkeysEvent);
                        break;
                    case 'button':
                        console.log('Seleccionar botón al azar');
                        randomBoton(monkeysEvent);
                        break;
                    default:
                        console.log('Lo lamentamos, por el momento no disponemos de ' + randomEvento + '.');
                        break;
                        
                }
            }
        });
        
        monkeysLeft = monkeysLeft - 1;
        cy.wait(1000);
        randomEvent(monkeysLeft);
    }
}

