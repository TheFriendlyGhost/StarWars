class Jedi{
	constructor(Name, HP, AP, sourcePath) {
	    this.name = Name;
	    this.AttackPower = AP;
	    this.HealthPoints = HP;
	    this.CounterAttack = AP;
	    this.imgSrc = sourcePath;
	}

	setAPCAP(AP){
		this.AttackPower = AP
		this.CounterAttack = AP
	}

	setHealthPoints(HP){
		this.HealthPoints = HP
	}


	makeJedis(){

		this.element = $('<button>')
		this.element.addClass("jediOptions box col-md-2 mx-1 card border-success")
		this.element.attr("data-value", this.name)

		this.title = $('<h3>')
		this.title.addClass("card-header w-100 align-top")
		this.title.text(this.name)
		this.element.append(this.title)

		this.image = $('<img>')
		this.image.addClass("card-img-top")
		this.image.attr('src',this.imgSrc)
		this.element.append(this.image)

		this.footer = $('<h3>')
		this.footer.addClass("card-footer w-100")
		this.footer.text(this.HealthPoints)
		this.element.append(this.footer)


		return this.element
	}

	updateHealth(){
		this.footer.text(this.HealthPoints)
	}

	isdead(){
		this.element.css("visibility", "hidden")
	}
}

$(document).ready(function(){
	var jedis = ["Obi-Wan Kenobi","Luke Skywalker","Darth Sidius","DarthMaul"]
	var yourChar = ""
	var curEnemy = ""
	var choiceChar = false
	var choiceEnemy = false
	var canAttack = false
	var count = jedis.length - 1

	var Obi = new Jedi(jedis[0], 120, 10, "assets/images/obi.jpg")
	var Luke = new Jedi(jedis[1], 150, 12, "assets/images/luke.jpg")
	var Sid = new Jedi(jedis[2], 170, 16, "assets/images/sid.jpeg")
	var Maul = new Jedi(jedis[3], 190, 20, "assets/images/maul.jpeg")

	$('#selection').append(Obi.makeJedis())
	$('#selection').append(Luke.makeJedis())
	$('#selection').append(Sid.makeJedis())
	$('#selection').append(Maul.makeJedis())

	$('#h1-2').hide()
	$('#reset').hide()
	$('#info').hide()
	$('#info2').hide()



	$("#selection").on('click', 'button.jediOptions', function() {
		if (!choiceChar) {
			var name = $(this).attr('data-value')

			if(name === jedis[0]){
				yourChar = Obi
			}
			if(name === jedis[1]){
				yourChar = Luke
			}
			if(name === jedis[2]){
				yourChar = Sid
			}
			if(name === jedis[3]){
				yourChar = Maul
			}

			$(this).addClass('yourChar')
			$(this).removeClass('jediOptions')
			$('#yourChoice').append($('.yourChar'))

			$('.jediOptions').addClass('enemyOptions')
			$('#opponents').append($('.jediOptions'))

			$('.enemyOptions').removeClass('jediOptions border-success')
			$('.enemyOptions').addClass('border-dark bg-danger')

			

			$('#h1-2').show()
	

			choiceChar = true
		}
	});

	$("#opponents").on('click', 'button.enemyOptions', function(event) {
		// event.preventDefault();
		if(!choiceEnemy) {
			var name = $(this).attr("data-value")
			if(name === jedis[0]){
				curEnemy = Obi
			}
			if(name === jedis[1]){
				curEnemy = Luke
			}
			if(name === jedis[2]){
				curEnemy = Sid
			}
			if(name === jedis[3]){
				curEnemy = Maul
			}
			$(this).addClass("defender")
			$(this).removeClass("enemyOptions")
			$('#curDefender').append($('.defender'))

			choiceEnemy  = true
			canAttack = true
		}
	});

	$('#attack').click(function(){
		if(canAttack){
			$('#info').html("You attacked "+curEnemy.name+" for "+yourChar.AttackPower+" damage")
			$('#info2').html(curEnemy.name+ " attacked you for "+curEnemy.CounterAttack+" damage")

			yourChar.HealthPoints = yourChar.HealthPoints - curEnemy.CounterAttack
			curEnemy.HealthPoints = curEnemy.HealthPoints - yourChar.AttackPower
			yourChar.AttackPower += 10

			$('#info').show()
			$('#info2').show()
			
			if(yourChar.HealthPoints <= 0){
				yourChar.HealthPoints = 0
				yourChar.isdead()
				canAttack = false
		$('#reset').hide()
				$('#info').html("You have died, click restart to start a new game")
				$('#info2').html("")
				return
			}

			if(curEnemy.HealthPoints <= 0){
				curEnemy.HealthPoints = 0
				curEnemy.isdead()
				choiceEnemy = false
				canAttack = false
				$('#info').html("You killed "+curEnemy.name+" choose your next victim")

				count--
			}

			yourChar.updateHealth()
			curEnemy.updateHealth()

			if(!count){
				$('#info').html("YOU WIN ! ! !")
				$('#info2').html("")
				$('#reset').show()
			}
		}
	})

	$('#reset').click(function(){
		choiceChar = false
		choiceEnemy = false
		canAttack = false

		count = jedis.length

		$('#reset').hide()

		$('#selection').empty()
		$('#yourChoice').empty()
		$('#opponents').empty()
		$('#curDefender').empty()

		$('#info').empty()
		$('#info2').empty()
		$('#info').hide()
		$('#info2').hide()

		Obi.setAPCAP(10)
		Obi.setHealthPoints(120)
		Luke.setAPCAP(12)
		Luke.setHealthPoints(150)
		Sid.setAPCAP(16)
		Sid.setHealthPoints(170)
		Maul.setAPCAP(20)
		Maul.setHealthPoints(190)		

		$('#selection').append(Obi.makeJedis())
		$('#selection').append(Luke.makeJedis())
		$('#selection').append(Sid.makeJedis())
		$('#selection').append(Maul.makeJedis())


	})	
});
