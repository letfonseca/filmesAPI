<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//GET recebe/pega informações 
//POST envia informações
//PUT edita informações "update"
//DELETE deleta informações
//OPTIONS é a relação de methodos disponiveis para uso
header('Access-Control-Allow-Headers: Content-Type');

//Se o REQUEST_METHOD estiver dentro de OPTIONS(GET,POST,PUT,DELETE), ele vai retornar exit, se nao retornar, ele manda a mensagem echo.
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;
}

include 'conexao.php';

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    //aqui eu crio o comando de SELECT para consultar o banco
    $stmt = $conn->prepare("SELECT * FROM filmes");
    //aqui eu executo o SELECT
    $stmt->execute();
    //aqui eu recebo os dados do banco por meio do PDO
    $filmes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //transformo os dados da variavel $filmes em um JSON valido
    echo json_encode($filmes);
}


if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $titulo = $_POST['titulo'];
    $diretor = $_POST['diretor'];
    $genero = $_POST['genero'];
    $ano_lancamento = $_POST['ano_lancamento'];
    

    $stmt = $conn->prepare("INSERT INTO Filmes (titulo, diretor, genero, ano_lancamento) VALUES(:titulo, :diretor, :genero, :ano_lancamento)");
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':diretor', $diretor);
    $stmt->bindParam(':genero', $genero);
    $stmt->bindParam(':ano_lancamento', $ano_lancamento);


    if($stmt->execute()){
        echo "Filme inserido com sucesso!!!";
    } else {
        echo"Erro ao inserir o Filme!!!";
    }
}

if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset ($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM filmes WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Filme exluido com sucesso!!";
    }else {
        echo "Erro ao excluir Filme";
    }
}

if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $novoTitulo = $_PUT['titulo'];
    $novoDiretor = $_PUT['diretor'];
    $novoGenero = $_PUT['genero'];
    $novoAno = $_PUT['ano_lancamento'];

    $stmt = $conn->prepare("UPDATE filmes SET titulo = :titulo, diretor = :diretor, genero = :genero, ano_lancamento = :ano_lancamento WHERE id = :id");
    $stmt->bindParam(':titulo', $novoTitulo);
    $stmt->bindParam(':diretor', $novoDiretor);
    $stmt->bindParam(':genero', $novoGenero);
    $stmt->bindParam(':ano_lancamento', $novoAno);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Filme atualizado";
    }else {
        echo "erro ao add o filme";
    }
}



