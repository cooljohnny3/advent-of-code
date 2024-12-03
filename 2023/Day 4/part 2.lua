local filename = "./example"
-- local filename = "./input"
-- local filename = "./input 2"

local games = {}
for line in io.lines(filename) do
    local colonIndex = string.find(line, ":");
    local pipeIndex = string.find(line, "|")
    local gameNumber = tonumber(string.sub(line, #"Card"+1, colonIndex-1))
    local winningNumbers = {}
    local currentIndex = colonIndex+2
    -- put the winning numbers in the table as the index with value as 0
    while currentIndex < pipeIndex do
        local winningNumber = tonumber(string.sub(line, currentIndex, currentIndex+2))
        -- print(winningNumber)
        winningNumbers[winningNumber] = 0
        currentIndex = currentIndex+3
    end
    -- check each of the other numbers and incriment the index if it exists
    local currentIndex = pipeIndex+2
    while currentIndex < #line do
        local number = tonumber(string.sub(line, currentIndex, currentIndex+2))
        local currentValue = winningNumbers[number]
        if currentValue ~= nil then
            winningNumbers[number] = currentValue + 1 
        end
        currentIndex = currentIndex+3
    end
    games[gameNumber] = winningNumbers
end

-- save a table of the cards that the index card won
local cards = {}
for game,values in pairs(games) do
    -- print("Game: "..game)
    local gameScore = 0 
    for i,value in pairs(values) do
        -- print(i, value)
        if value ~= 0 then
            gameScore = gameScore + 1
        end
    end
    -- print(gameScore)
    -- add the indecies of the cards that the current card won
    local cardNumber = game
    while cardNumber < #games do
        if cards[game] == nil then
            cards[game] = {cardNumber}
        else
            cards[game][#cards[game]+1] = cardNumber
        end
        cardNumber = cardNumber + 1
    end
end

for i,value in pairs(cards) do
    for j,cardNumber in pairs(value) do
        print(j, cardNumber)
    end
end