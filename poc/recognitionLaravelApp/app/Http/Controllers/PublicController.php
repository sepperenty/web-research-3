<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Character;

class PublicController extends Controller
{
    public function index(){
        return view("index");
    }

    public function storePicture(Request $request){
        $data = $request->dataURI;

        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);
        $data = base64_decode($data);


        $newOriginalName = rtrim(base64_encode(md5(microtime())), "=");
        file_put_contents('../resources/images/'.$newOriginalName.'.jpg', $data);
        $newGrayScaleName = $newOriginalName . "+";
        $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\grayScaler.py '.$newOriginalName . " " . $newGrayScaleName;
        exec($command, $output);

        if($output[0] == "success"){
            unlink('../resources/images/'. $newOriginalName . ".jpg");
            $allCharacters = Character::get();
            $smallest = 200000;
            $values = [];
            $name = "";
            foreach ($allCharacters as $character){
                $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\imageComparison.py '. $character->dataUrl . " " . $newGrayScaleName;
                $output = null;
                exec($command, $output);
                if($output[0] < $smallest)
                {
                    $smallest = $output[0];
                    $name = $character->name;
                    $values[0] = $name;

                }
                $char = [];
                $char[0] = $character->name;
                $char[1] = $output[0];
                array_push($values, $char);

            }

            //return $wrongValues;
            unlink('../resources/images/'. $newGrayScaleName . ".png");
            return $values;

            //when doesn't work do this to see error
            //exec('python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\test.py capt0001 2>&1', $output);
        }



    }

    public function newName(Request $request){
        $newName = $request->name;
        $data = $request->dataURI;
        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);
        $data = base64_decode($data);
        $newOriginalName = rtrim(base64_encode(md5(microtime())), "=");
        $newGrayScaleName = $newOriginalName . "+";
        file_put_contents('../resources/images/'.$newOriginalName.'.jpg', $data);
        $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\grayScaler.py '.$newOriginalName . " " . $newGrayScaleName;
        exec($command, $output);
        if($output[0] == "success"){
            unlink('../resources/images/'. $newOriginalName . ".jpg");
            $newCharacer = new Character();
            $newCharacer->name = $newName;
            $newCharacer->dataUrl = $newGrayScaleName;
            $newCharacer->save();
            return "success";
        }

        return "fail";

    }

    public function test(){
        $allCharacters = Character::get();
        return $allCharacters;
    }

    public function pythonTest(){

        $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\imageComparison.py '. "image1" . " " . "ZWU0NWUzNDcwZTA3MWM1YWE2NmUxNWUwOWI0NWZkNzY+" . " 2>&1";

        exec($command, $output);
        return $output;
    }
}
