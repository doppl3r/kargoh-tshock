class App {
    constructor() {
        this.players = [];
        this.home = $('main');
        this.updateList();
        this.startTimer();
    }

    updateList() {
        var url = 'https://cors-anywhere.herokuapp.com/kargoh.serv.nu:7878/v2/users/activelist?token=HMACSHA256';
        $.ajax({
            type: "POST",
            url: url,
            success: function(response) {
                var users = response.activeusers;
                console.log(users);
                app.players = users.trim().split('\t');
                app.updateHome();
            }
        });
    }

    updateHome() {
        var playerCount = this.players.length;
        var newHome = $('<main></main>');

        for (var i = 0; i < playerCount; i++) {
            var name = this.players[i];
            var left = this.randomNumber(25, 75);
            var direction = this.randomNumber(-1, 1) >= 0 ? 1 : -1;
            var playerClass = name.length <= 0 ? 'hide' : '';

            newHome.append(
                '<div class="room">' +
                    '<img class="background" src="img/room.png">' +
                    '<div class="player" style="left: ' + left + '%;">' +
                        '<span>' + name + '</span>' +
                        '<img class="' + playerClass + '" style="transform: scaleX(' + direction + ');" src="img/player.png">' +
                    '</div>' +
                '</div>'
            );
        }
        this.home.html(newHome.html());
    }

    randomNumber(min, max) {  
        return Math.random() * (max - min) + min; 
    }
    
    startTimer() {
        setInterval(function(){
            app.updateList();
        }, 10000);
    }
}
var app = new App();