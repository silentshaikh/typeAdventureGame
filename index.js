#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class AdventureGame {
    static async main() {
        let randNumber = Math.floor(Math.random() * 100);
        let ourEnemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
        // Game Variable
        let maxEnemyHealth = 75;
        let enemyAttackDamage = 25;
        // Player Variable
        let health = 100;
        let attackDamage = 50;
        let numHealthPotions = 3;
        let healthPotionHealAmount = 30;
        let healthPotionDropAmount = 50; //enemy drop potion
        console.log(chalk.greenBright("\t\t--- Welcome to Dungeon --- \n"));
        let ourGameInquirer;
        let gamePlayerName;
        let playerCond = true;
        while (playerCond) {
            gamePlayerName = await inquirer.prompt([
                { name: "playerName", message: "Enter Your Name", type: "string" },
            ]);
            if (!gamePlayerName.playerName) {
                console.log(chalk.red("\t Please Enter Your Name\n"));
            }
            else if (gamePlayerName.playerName.length < 3) {
                console.log(chalk.red("\t Your Character must be 3 and more\n"));
            }
            else if (gamePlayerName.playerName.length >= 3) {
                playerCond = false;
            }
            ;
        }
        ;
        let playerWeapon = await inquirer.prompt([
            { name: "weaponList", message: "Select Your Waepon", type: "list", choices: ["Rifle Gun", "Short Gun", "Air Gun", "Machine Gun", "Revolver", "Chemical Bomb", "Cluster Bomb", "Fragmentation Bomb"] },
        ]);
        let runnig = true;
        GAME: while (runnig) {
            console.log(chalk.greenBright("\n ------------------------------------------------------ \n"));
            let enemiesHealth = Math.floor(Math.random() * maxEnemyHealth);
            let enemy = ourEnemies[Math.floor(Math.random() * ourEnemies.length)];
            console.log(chalk.yellowBright(chalk.bold(`\t \n # ${enemy} has appeared #\n`)));
            console.log(chalk.greenBright(`\tPlayer Name is : ${chalk.bold(gamePlayerName.playerName)} and his weapon is ${playerWeapon.weaponList}. \n`));
            while (enemiesHealth > 0) {
                console.log(chalk.cyanBright(`\n\t# Hello ${gamePlayerName.playerName}, Your HP : ${chalk.bold(health)} \n`));
                console.log(chalk.cyanBright(`\t# ${chalk.bold(enemy)}'s, HP : ${chalk.bold(enemiesHealth)} \n`));
                console.log(chalk.cyanBright(`\t# What would you like to do ? \n`));
                console.log(chalk.cyanBright(`\t# 1: Attack! \n`));
                console.log(chalk.cyanBright(`\t# 2: Drink Health Potion! \n`));
                console.log(chalk.cyanBright(`\t# 3: run! \n`));
                ourGameInquirer = await inquirer.prompt([
                    { name: "option", message: "Enter a Number", type: "number" },
                ]);
                if (ourGameInquirer.option === 1) {
                    let enemyDamage = Math.floor(Math.random() * attackDamage);
                    let playerDamage = Math.floor(Math.random() * enemyAttackDamage);
                    enemiesHealth -= enemyDamage;
                    health -= playerDamage;
                    console.log(chalk.greenBright(`\t \nDear ${gamePlayerName.playerName},  You strike the ${chalk.bold(enemy)} for ${chalk.bold(enemyDamage)} Damage.`));
                    console.log(chalk.greenBright(`\t You recieve ${chalk.bold(playerDamage)} in retaliation \n`));
                    if (health < 1) {
                        console.log(chalk.red(`\t --- Dear ${gamePlayerName.playerName}, You have taken too much damage ,you are weak to go on! --- \n`));
                        break;
                    }
                    ;
                }
                else if (ourGameInquirer.option === 2) {
                    if (numHealthPotions > 0) {
                        health += healthPotionHealAmount;
                        numHealthPotions--;
                        console.log(chalk.greenBright(`\t Dear ${gamePlayerName.playerName}, You drunk a Health Potion yourself for ${healthPotionHealAmount}.\n \t Dear ${gamePlayerName.playerName}, You now have ${health} HP.\n \t So You have ${numHealthPotions} Health Potion Left.\n`));
                    }
                    else {
                        console.log(chalk.red(`\n\tDear ${gamePlayerName.playerName}, You have no Health Potion left Defeat enemy for a chance to get one !.\n`));
                    }
                }
                else if (ourGameInquirer.option === 3) {
                    console.log(chalk.greenBright(`\t Dear ${gamePlayerName.playerName}, You run away from the ${enemy}! \n`));
                    continue GAME;
                }
                else {
                    console.log(chalk.red("\t Invalid Option \n"));
                }
            }
            ;
            if (health < 1) {
                console.log(chalk.red(`\t ---- You limp out from dungeon , weak from battle --- \n`));
                break;
            }
            ;
            console.log(chalk.greenBright("\t ------------------------------------------------------\n"));
            console.log(chalk.greenBright(`\t Dear ${gamePlayerName.playerName}, You defeat the ${enemy} Enemy.\n`));
            console.log(chalk.greenBright(`\t You have ${health} HP left.\n`));
            if (randNumber < healthPotionDropAmount) {
                numHealthPotions++;
                console.log(chalk.greenBright(`\t The ${enemy} dropped a Health Potion.\n`));
                console.log(chalk.greenBright(`\t So, Dear ${gamePlayerName.playerName}, You now have ${numHealthPotions} Health Potion.\n`));
            }
            ;
            console.log(chalk.greenBright("\t ------------------------------------------------------\n"));
            console.log(chalk.yellowBright("What Would you like to do now ?\n"));
            console.log(chalk.yellowBright("1 : Continue Fighting\n"));
            console.log(chalk.yellowBright("2 : Exit Dungoen \n"));
            ourGameInquirer = await inquirer.prompt([
                { name: "sectionTwo", message: "Enter a Number", type: "number" },
            ]);
            while (ourGameInquirer.sectionTwo !== 1 && ourGameInquirer.sectionTwo !== 2) {
                console.log(chalk.red("\t Invalid Option"));
                ourGameInquirer = await inquirer.prompt([
                    { name: "sectionTwo", message: "Enter a Number", type: "number" },
                ]);
            }
            ;
            if (ourGameInquirer.sectionTwo === 1) {
                console.log(chalk.blueBright(" \n\t --- You Continue Your Fighting ---"));
            }
            else if (ourGameInquirer.sectionTwo === 2) {
                console.log(chalk.yellowBright("\n --- You Exit the dungeon Successfully From your Adventure --- \n"));
                break;
            }
            ;
        }
        ;
        console.log(chalk.greenBright("\t###########################\n"));
        console.log(chalk.greenBright("\t---- THANKS FOR PLAYING ---\n"));
        console.log(chalk.greenBright("\t###########################\n"));
    }
    ;
}
;
let ourAdventureGame = new AdventureGame();
AdventureGame.main();
