class App {
    constructor() {
        this.players = [];
        this.rooms = $('.rooms.current');
        this.updateList();
        this.startTimer();
    }

    updateList() {
        var url = 'https://cors-anywhere.herokuapp.com/kargoh.serv.nu:7878/v2/users/activelist?token=HMACSHA256';
        $.ajax({
            type: "POST",
            url: url,
            timeout: 5000,
            success: function(response) {
                var users = response.activeusers;
                app.players = users.trim().split('\t');
                app.updateHome();
            },
            error: function(response) {
                app.updateHome();
            }
        });
    }

    updateHome() {
        var newRooms = $('.rooms.new').empty().hide();
        if (this.players.length <= 0) this.players = [''];
        for (var i = 0; i < this.players.length; i++) {
            var name = this.players[i];
            var left = this.randomNumber(25, 75);
            var direction = this.randomNumber(-1, 1) >= 0 ? 1 : -1;
            var playerClass = name.length <= 0 ? 'hide' : '';

            newRooms.append(
                '<div class="room">' +
                    '<img class="background" src="img/room.png">' +
                    '<div class="player" style="left: ' + left + '%;">' +
                        '<span>' + name + '</span>' +
                        '<img class="' + playerClass + '" style="transform: scaleX(' + direction + ');" src="img/player.png">' +
                    '</div>' +
                '</div>'
            );
        }
        newRooms.fadeIn(1000, function() {
            app.rooms.html(newRooms.html());
        });
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